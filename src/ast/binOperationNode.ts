import { ExpressionNode } from './expressionNode'
import { Token } from '../token'

interface BinOperationNodeConfig {
    operator: Token
    leftNode: ExpressionNode
    rightNode: ExpressionNode
}

export class BinOperationNode extends ExpressionNode {
    operator: Token
    leftNode: ExpressionNode
    rightNode: ExpressionNode


    constructor({ operator, leftNode, rightNode }: BinOperationNodeConfig) {
        super()

        this.operator = operator
        this.leftNode = leftNode
        this.rightNode = rightNode
    }
}