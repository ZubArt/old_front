export default class Utils {
    static load(context) {
        return context.keys().map(context)
    }

    static loadWithDefault(context) {
        return context.keys().map(item => context(item).default)
    }
}
