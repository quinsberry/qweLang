import { Token } from './token'
import { tokenTypesList } from './tokenType'
import { PrimalTypes } from './types'

interface LexerConfig {
    code: string
}

export class Lexer {
    private code: string
    private pos: number = 0

    public tokenList: Token[] = []

    constructor({ code }: LexerConfig) {
        this.code = code
    }

    public lexAnalysis(): Token[] {
        while (this.nextToken()) {
        }
        this.tokenList = this.tokenList.filter(token => token.type.name !== PrimalTypes.SPACE)
        return this.tokenList
    }

    private nextToken(): boolean {
        if (this.pos >= this.code.length) {
            return false
        }
        const tokenTypesValues = Object.values(tokenTypesList)
        for (const tokenType of tokenTypesValues) {
            const regex = new RegExp('^' + tokenType.regex)
            const result = this.code.substr(this.pos).match(regex)
            if (result && result[0]) {
                const token = new Token({
                    type: tokenType,
                    text: result[0],
                    pos: this.pos,
                })
                this.pos += result[0].length
                this.tokenList.push(token)
                return true
            }
        }
        throw new Error(`Error occurred on position ${this.pos}`)
    }
}