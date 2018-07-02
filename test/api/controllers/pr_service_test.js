/**
 * Created by azhakesan on 7/1/2018.
 */
var should = require('should');

var service = require("../../../api/service/pr_service");

describe('serivce', function () {
    describe('pr_service', function () {
        // getGitHubRepositories
        it("getGitHubRepositories", function (done) {
            var input = {}
            input.pulls_url = "https://github.com/azhakesan/css3";
            service.getGitHubRepositories("azhakesan", 1, 10).then(function (res) {
                res.should.be.ok();
                done();
            });
        });
        // getPullRequestCount
        it("getPullRequestCount", function (done) {
            var input = {
                "id": 128576412,
                "name": "css3",
                "pulls_url": "https://api.github.com/repos/azhakesan/css3/pulls?state=open",
                "html_url": "https://github.com/azhakesan/css3",
                "pull_count": 0
            };
            service.getPullRequestCount(input, "azhakesan").then(function (res) {
                res.should.be.ok();
                done();
            });
        });
    });
});
