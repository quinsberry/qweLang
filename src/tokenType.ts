import { PrimalTypes } from './types'

interface TokenTypeConfig {
    name: PrimalTypes
    regex: string
}

export class TokenType {
    public readonly name: PrimalTypes
    public readonly regex: string

    constructor({ name, regex }: TokenTypeConfig) {
        this.name = name
        this.regex = regex
    }
}

export const tokenTypesList = {
    [PrimalTypes.NUMBER]: new TokenType({ name: PrimalTypes.NUMBER, regex: '[0-9]*' }),
    [PrimalTypes.VARIABLE]: new TokenType({ name: PrimalTypes.VARIABLE, regex: '[a-z]*' }),
    [PrimalTypes.SEMICOLON]: new TokenType({ name: PrimalTypes.SEMICOLON, regex: ';' }),
    [PrimalTypes.SPACE]: new TokenType({ name: PrimalTypes.SPACE, regex: '[ \\n\\t\\r]' }),
    [PrimalTypes.ASSIGN]: new TokenType({ name: PrimalTypes.ASSIGN, regex: 'ROWNASIE' }),
    [PrimalTypes.LOG]: new TokenType({ name: PrimalTypes.LOG, regex: 'KONSOLA' }),
    [PrimalTypes.PLUS]: new TokenType({ name: PrimalTypes.PLUS, regex: 'PLUS' }),
    [PrimalTypes.MINUS]: new TokenType({ name: PrimalTypes.MINUS, regex: 'MINUS' }),
    [PrimalTypes.LPAR]: new TokenType({ name: PrimalTypes.LPAR, regex: '\\(' }),
    [PrimalTypes.RPAR]: new TokenType({ name: PrimalTypes.RPAR, regex: '\\)' }),
}

