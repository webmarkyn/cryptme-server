
export const paramMissingError = 'One or more of the required parameters was missing.';

type AlgoList = {
    [key: string]: {
        keyLength: number,
        ivLength: number,
    }
}

export const algoList: AlgoList = {
    'blowfish': {
        keyLength: 32,
        ivLength: 8,
    },
    'aes-256-ctr': {
        keyLength: 32,
        ivLength: 16,
    },
    'des': {
        keyLength: 8,
        ivLength: 8,
    }
}