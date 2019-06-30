// 当我们在进行开发的时候，通常需要属于我们自己的错误类来反映任务中可能出现的特殊情况。
// 对于网络操作错误，我们需要 HttpError，对于数据库操作错误，我们需要 DbError，对于搜索操作错误，
// 我们需要 NotFoundError，等等。

// ValidationError 
// 这种类型的错误承载缺少的字段的信息

/**
 * @example
 * // throw new ValidationError("No field: age")
 */
export class ValidationError extends Error {
    /**
     * @constructor
     * @param {string} message - error info
     */
    constructor(message) {
        super(message)
        this.name = 'ValidationError'
    }
}

// ValidationError 类是十分通用的。
// 因此可能会在某些方面出错。属性可能缺失，格式可能发生错误
// （例如 age 属性的值为一个字符串）。

// 
// 它

/**
 * 一个更加具体的类 PropertyRequiredError，为属性缺失的错误而量身定做的。
 * 将会承载属性缺失的相关信息。
 * @example
 * // throw new PropertyRequiredError("age")
 */
export class PropertyRequiredError extends ValidationError {
    constructor(property) {
        super("No property: " + property)
        this.name = 'PropertyRequireError'
        this.property = property
    }
}

export default {    
    PropertyRequiredError,
}