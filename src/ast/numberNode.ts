import { Token } from '../token'

interface NumberNodeConfig {
    number: Token
}
export class NumberNode {
    public readonly number: Token

    constructor({ number }: NumberNodeConfig) {
        this.number = number
    }
}