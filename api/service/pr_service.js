/**
 * Created by azhakesan on 7/1/2018.
 */
const request = require('request');
const helper = require('../helpers/pr_helper');
module.exports = {
    getGitHubRepositories: _getGitHubRepositories,
    getPullRequestCount: _getPullRequestCount
};
const auth = "Basic " + new Buffer("snkirklandinterview" + ':' + "1fff4d9bdc4e0a368d72319bce9fa85d89d39ff6").toString("base64");
/**
 * This function return the List of Public GitHup repo for given user.
 * @param userId
 * @param page
 * @param perPage
 * @returns {Promise}
 * @private
 */
function _getGitHubRepositories(userId, page, perPage) {
    return new Promise(function (resolve, reject) {
        const endPoint = helper.constant.GIT_HUB_API + userId + "/repos?page=" + page + "&per_page=" + perPage;
        request.get({
                url: endPoint, // API endpoint
                json: true,
                timeout: helper.constant.TIMEOUT, // timeout
                headers: {
                    'Authorization': auth,
                    'User-Agent': userId
                }
            }, function (error, response) {
                if (error) {
                    reject(helper.handleError(error));
                } else if (response != null && response.statusCode === 200) {
                    resolve(helper.handleSuccess(response.body));
                } else {
                    reject(helper.handleError(response));
                }
            }
        );
    });
}
/**
 * The function returns Open Pull request count for each repo
 * @param repo
 * @param userId
 * @returns {Promise}
 * @private
 */
function _getPullRequestCount(repo, userId) {
    return new Promise(function (resolve, reject) {
        request.get({
                url: repo.pulls_url, // Repo API endpoint
                json: true,
                timeout: helper.constant.TIMEOUT, // timeout
                headers: {
                    'Authorization': auth,
                    'User-Agent': userId
                }
            }, function (error, response) {
                if (error) {
                    reject(helper.handleError(error));
                } else if (response != null && response.statusCode === 200) {
                    if (response.body != undefined && response.body != null) {
                        repo.pull_count = response.body.length;
                    } else {
                        repo.pull_count = 0;
                    }
                    resolve(repo);
                } else {
                    reject(helper.handleError(response));
                }
            }
        );
    });
}