import { Token } from '../token'
import { ExpressionNode } from './expressionNode'

interface UnarOperationNodeConfig {
    operator: Token
    operand: ExpressionNode
}

export class UnarOperationNode {
    operator: Token
    operand: ExpressionNode

    constructor({ operator, operand }: UnarOperationNodeConfig) {
        this.operator = operator
        this.operand = operand
    }
}