
const ITERATIONS = 310000;

const generateSalt = () => {
    const salt = crypto.getRandomValues(new Uint8Array(16));

    return Array.from(salt)
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
};

const derivePasswordHash = async (password, salt) => {
    const encoder = new TextEncoder();

    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        "PBKDF2",
        false,
        ["deriveBits"]
    );

    const hashBuffer = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt: Uint8Array.from(
                salt.match(/.{2}/g).map((byte) => parseInt(byte, 16))
            ),
            iterations: ITERATIONS,
            hash: "SHA-256",
        },
        keyMaterial,
        256
    );

    return Array.from(new Uint8Array(hashBuffer))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
};

export const hashPassword = async (password) => {
    const salt = generateSalt();
    const hash = await derivePasswordHash(password, salt);

    return { salt, hash };
};

export const verifyPassword = async (password, salt, storedHash) => {
    const hash = await derivePasswordHash(password, salt);

    return hash === storedHash;
};
