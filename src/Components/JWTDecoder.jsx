import jwtDecode from "jwt-decode";

const JWTDecoder = (token) => {
    try {
        const decoded = jwtDecode(token);
        // console.log(decoded);
        // console.log("jwt");
        return decoded;
    } catch (error) {
        return null;
    }
}
export default JWTDecoder;
