import { Lexer } from './lexer'
import { Parser } from './parser'

const code =
    `sum ROWNASIE 5 PLUS 9 PLUS ( 4 MINUS 6 );
     KONSOLA sum;
     variable ROWNASIE sum PLUS 3;
     KONSOLA variable PLUS sum MINUS 6;`

const lexer = new Lexer({ code })

lexer.lexAnalysis()
const parser = new Parser({
    tokens: lexer.tokenList,
})
const rootNode = parser.parseCode()
parser.run(rootNode)