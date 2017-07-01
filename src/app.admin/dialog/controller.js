/** @ngInject */
export default ($scope, $mdDialog, $showdown, $mdConstant, item, PostsResource) => {
    $scope.item = item || {images: {}, urls: {}, tags: []};
    $scope.cancel = $mdDialog.cancel;
    $scope.submit = data => {
        data.tags = $scope.selectedTags.map(tag => tag.name.toLowerCase());
        data.descHtml = $showdown.makeHtml(data.description);
        $mdDialog.hide(data);
    };

    $scope.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];

    let tags;

    const assign = items => {
        tags = items.map(name => ({name, type:'', __name: name.toLowerCase()}));
        return tags
    };
    const loadTag = () => tags ? new Promise((res, rej) => res(tags)) : new PostsResource.tags().$promise.then(assign);

    const filterFn = text => {
        text = text.toLowerCase();
        return d => ~d.__name.indexOf(text)
    };

    const ignore = item => {
        const items = $scope.selectedTags.filter(d => item.name === d.name);
        return !items.length
    };

    $scope.selectedTags = item && item.tags.map(name => ({name, type:'', __name: name.toLowerCase()})) || [];

    $scope.querySearch = text => text ? loadTag().then(res => res.filter(ignore).filter(filterFn(text))) : [];

    $scope.transformChip = (chip) => {
        if (angular.isObject(chip)) {
            return chip;
        }

        const name = chip.toLowerCase();
        const items = tags.filter(d => d.__name === name);
        if (items.length) {
            return items[0]
        }

        return { name: chip, type: '*' }
    };

    function processing(img) {
        const mime_type = "image/png";

        const maxWidth = 50;
        let natW = img.naturalWidth;
        let natH = img.naturalHeight;
        let ratio = natH / natW;
        if (natW > maxWidth) {
            natW = maxWidth;
            natH = ratio * maxWidth;
        }

        const cvs = document.createElement('canvas');
        cvs.width = natW;
        cvs.height = natH;

        const ctx = cvs.getContext("2d").drawImage(img, 0, 0, natW, natH);
        const result = cvs.toDataURL(mime_type);

        finishImageLoad();
        $scope.item.images.preview = result
    }

    function finishImageLoad() {
        $scope.$apply(() => {
            $scope.loading = false;
            $scope.processing = false;
        });
    }

    $scope.fileChange = (event) => {

        const element = event.target;

        const file = element.files[0];
        if (!file)
            return;

        $scope.item.images = $scope.item.images || {};

        $scope.$apply(() => {
            $scope.fileProgress = 0;
            $scope.processing = true;
            $scope.loading = true;
            $scope.item.images.full =
            $scope.item.images.preview = null;
        });

        const reader = new FileReader();
        reader.onprogress = (e) => {
            $scope.$apply(() => {
                $scope.fileProgress = (e.loaded / e.total * 100) | 0;
            });
        };

        reader.onerror = finishImageLoad;

        reader.onloadend = () => {
            $scope.$apply(() => {
                const img = new Image();
                img.onerror = finishImageLoad;
                img.onload = () => {
                    $scope.item.images.full = reader.result;
                    processing(img);
                };
                img.src = reader.result;
            });
        };
        reader.readAsDataURL(file);
    };

    $scope.previewRefresh = () => {
        const img = new Image();
        $scope.processing = true;
        img.onerror = finishImageLoad;
        img.onload = () => {
            processing(img);
        };
        img.src = $scope.item.images.full;
    }
}