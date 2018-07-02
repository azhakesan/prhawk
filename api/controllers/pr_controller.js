/**
 * Created by azhakesan on 7/1/2018.
 */
const util = require('util');
const service = require('../service/pr_service');
const helper = require('../helpers/pr_helper');

module.exports = {
    getUserRepositories: _getUserRepositories
};
/**
 * Get  list of GitHub Repo Details for given user.
 * @param req
 * @param res
 */
function _getUserRepositories(req, res, next) {
    // Get GitHub user id
    const userId = req.swagger.params.userId.value;
    // By default to page 1 if there is no input  value
    const page = req.swagger.params.page.value || 1;
    // By default to per page 10 if there is no input value
    const per_page = req.swagger.params.per_page.value || 1000;
    let outputJson = {};
    console.log("UserId=" + userId + ", page=" + page + ", per page=" + per_page);
    if (userId != null && userId != "") {
        // Get the list of GitHub repo for given user id.
        service.getGitHubRepositories(userId, page, per_page).then(function (data) {
            outputJson.code = helper.constant.PR_CODE_200;
            outputJson.status = helper.constant.SUCCESS;
            outputJson.repos = data;
            let promises = data.map(function (p) {
                return service.getPullRequestCount(p, userId);
            });
            // Get the Pull request Count for each repo.
            Promise.all(promises).then(function (dataList) {
                // Success response object and apply sort DESC
                let sortList = dataList.sort(function (a, b) {
                    return b.pull_count - a.pull_count;
                });
                outputJson.repos = sortList;
                res.status(200).json(outputJson);
                return next();
            }).catch(function (err) {
                // return the with Http Error code and message
                res.status(err.httpCode).json(err.errorMsg);
                return next();
            });

        }).catch(function (err) {
            // return the with Http Error code and message
            res.status(err.httpCode).json(err.errorMsg);
            return next();
        });

    } else {
        outputJson.status = helper.constant.FAILURE;
        outputJson.message = helper.constant.INPUT_ERROR;
        res.status(400).json(outputJson);
        return next();
    }
}
