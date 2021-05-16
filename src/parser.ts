import { Token } from './token'
import { TokenType, tokenTypesList } from './tokenType'
import { ExpressionNode } from './ast/expressionNode'
import { StatementsNode } from './ast/statementsNode'
import { PrimalTypes } from './types'
import { NumberNode } from './ast/numberNode'
import { VariableNode } from './ast/variableNode'
import { BinOperationNode } from './ast/binOperationNode'
import { UnarOperationNode } from './ast/unarOperationNode'

interface ParserConfig {
    tokens: Token[]
}

export class Parser {
    private readonly tokens: Token[]
    private pos: number = 0
    private scope: any = {}

    constructor({ tokens }: ParserConfig) {
        this.tokens = tokens
    }

    public run(node: ExpressionNode): any {
        if (node instanceof NumberNode) {
            return parseInt(node.number.text)
        } else if (node instanceof UnarOperationNode) {
            switch (node.operator.type.name) {
                case tokenTypesList[PrimalTypes.LOG].name:
                    console.log(this.run(node.operand))
                    return
            }
        } else if (node instanceof BinOperationNode) {
            switch (node.operator.type.name) {
                case tokenTypesList[PrimalTypes.PLUS].name:
                    return this.run(node.leftNode) + this.run(node.rightNode)
                case tokenTypesList[PrimalTypes.MINUS].name:
                    return this.run(node.leftNode) - this.run(node.rightNode)
                case tokenTypesList[PrimalTypes.ASSIGN].name:
                    const result = this.run(node.rightNode)
                    const variableNode = <VariableNode>node.leftNode
                    this.scope[variableNode.variable.text] = result
                    return result
            }
        } else if (node instanceof VariableNode) {
            if (this.scope[node.variable.text]) {
                return this.scope[node.variable.text]
            } else {
                throw new Error(`Variable with ${node.variable.text} name not found`)
            }
        } else if (node instanceof StatementsNode) {
            node.codeStrings.forEach(codeString => {
                this.run(codeString)
            })
            return
        } else {
            throw new Error(`Parsing error..`)
        }
    }

    public parseCode(): ExpressionNode {
        const root = new StatementsNode()
        while (this.pos < this.tokens.length) {
            const codeStringNode = this.parseExpression()
            this.require(tokenTypesList[PrimalTypes.SEMICOLON])
            root.addNode(codeStringNode)
        }
        return root
    }

    private parseExpression(): ExpressionNode {
        if (this.match(tokenTypesList[PrimalTypes.VARIABLE]) === null) {
            return this.parsePrint()
        }
        this.pos -= 1
        let variableNode = this.parseVariableOrNumber()
        const assignOperator = this.match(tokenTypesList[PrimalTypes.ASSIGN])
        if (assignOperator !== null) {
            const rightFormulaNode = this.parseFormula()
            return new BinOperationNode({
                operator: assignOperator,
                leftNode: variableNode,
                rightNode: rightFormulaNode,
            })
        }
        throw new Error(`Assignment operator is expected after declaring variable on position ${this.pos}`)
    }

    private parsePrint(): ExpressionNode {
        const operatorLog = this.match(tokenTypesList[PrimalTypes.LOG])
        if (operatorLog !== null) {
            return new UnarOperationNode({
                operator: operatorLog,
                operand: this.parseFormula(),
            })
        }
        throw new Error(`Unar operator is expected after declaring variable on position ${this.pos}`)
    }

    private parseParentheses(): ExpressionNode {
        if (this.match(tokenTypesList[PrimalTypes.LPAR]) !== null) {
            const node = this.parseFormula()
            this.require(tokenTypesList[PrimalTypes.RPAR])
            return node
        } else {
            return this.parseVariableOrNumber()
        }
    }

    private parseFormula(): ExpressionNode {
        let leftNode = this.parseParentheses()
        let operator = this.match(tokenTypesList[PrimalTypes.MINUS], tokenTypesList[PrimalTypes.PLUS])
        while (operator !== null) {
            const rightNode = this.parseParentheses()
            leftNode = new BinOperationNode({
                operator,
                leftNode,
                rightNode,
            })
            operator = this.match(tokenTypesList[PrimalTypes.MINUS], tokenTypesList[PrimalTypes.PLUS])
        }
        return leftNode
    }

    private parseVariableOrNumber(): ExpressionNode {
        const number = this.match(tokenTypesList[PrimalTypes.NUMBER])
        if (number !== null) {
            return new NumberNode({ number })
        }
        const variable = this.match(tokenTypesList[PrimalTypes.VARIABLE])
        if (variable !== null) {
            return new VariableNode({ variable })
        }
        throw new Error(`Variable or number are expected on position ${this.pos}`)
    }

    private require(...expected: TokenType[]): Token {
        const token = this.match(...expected)
        if (!token) {
            throw new Error(`On position ${this.pos} was expected ${expected[0].name}`)
        }
        return token
    }

    private match(...expected: TokenType[]): Token | null {
        if (this.pos < this.tokens.length) {
            const currentToken = this.tokens[this.pos]
            if (expected.find(type => type.name === currentToken.type.name)) {
                this.pos += 1
                return currentToken
            }
        }
        return null
    }
}