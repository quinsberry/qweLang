import { TokenType } from './tokenType'

interface TokenConfig {
    type: TokenType
    text: string
    pos: number
}

export class Token {
    public readonly type: TokenType
    public readonly text: string
    public readonly pos: number

    constructor({ type, text, pos }: TokenConfig) {
        this.type = type
        this.text = text
        this.pos = pos
    }
}