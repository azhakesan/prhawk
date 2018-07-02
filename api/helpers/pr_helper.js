/**
 * Created by azhakesan on 7/1/2018.
 */
module.exports = {
    constant: {
        "PR_CODE_200": "PR-CODE-200",
        "SUCCESS": "success",
        "FAILURE": "failure",
        "INPUT_ERROR": "Input validation failure",
        "GIT_HUB_API": "https://api.github.com/users/",
        "TIMEOUT": 5000
    },
    handleError: _handleError,
    handleSuccess: _handleSuccess,
};
/**
 *
 * @param response
 * @private
 */
function _handleSuccess(response) {
    let repoList = response.map(function (v) {
        let o = {
            id: v.id,
            name: v.name,
            pulls_url: v.url + "/pulls?state=open",
            html_url: v.html_url
        };
        return o;
    });
    return repoList;
}
/**
 *
 * @param error
 * @returns {*}
 * @private
 */
function _handleError(error) {
    if (error.code === 'ETIMEDOUT') {
        return {
            httpCode: 500,
            errorMsg: {
                code: "PR-ERR-500",
                status: "failed",
                message: "Timeout error."
            }
        };
    } else {
        return {
            httpCode: error.statusCode, errorMsg: {
                code: "PR-ERR-500",
                status: "failed",
                message: "Internal server error."
            }
        };
    }
}