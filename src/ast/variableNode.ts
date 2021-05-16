import { ExpressionNode } from './expressionNode'
import { Token } from '../token'

interface VariableNodeConfig {
    variable: Token
}
export class VariableNode extends ExpressionNode {
    public readonly variable: Token

    constructor({ variable }: VariableNodeConfig) {
        super()

        this.variable = variable
    }
}