"use babel";
/* globals atom */

import gitCmd from "../../lib/git-cmd";
import { getFilePath, removeGitRoot, createGitRoot } from "../mocks";
import fs from "fs";

describe("git.init", function () {

	describe("unit tests", function () {

		beforeEach(function(){
			spyOn(gitCmd, "cmd").and.returnValue(Promise.resolve());

			this.files = ["file1", "file2"];
			this.gitRoot = "root";
		});

		it("should send init commad", async function(){
			await gitCmd.init(this.gitRoot);

			expect(gitCmd.cmd.calls.mostRecent().args[1]).toEqual(["init", "--quiet"]);
		});

		it("should remove --quiet parameter", async function(){
			await gitCmd.init(this.gitRoot, true);

			expect(gitCmd.cmd.calls.mostRecent().args[1]).not.toContain("--quiet");
		});
	});

	// describe("integration tests", function () {
	//
	// 	beforeEach(async function () {
	// 		await atom.packages.activatePackage("context-git");
	// 		createGitRoot();
	// 		this.gitRoot = getFilePath();
	// 		atom.project.setPaths([this.gitRoot]);
	// 		this.gitPath = getFilePath(".git");
	// 	});
	//
	// 	afterEach(function () {
	// 		removeGitRoot();
	// 	});
	//
	// 	it("should create a .git folder", async function () {
	// 		await gitCmd.init(this.gitRoot);
	// 		await gitCmd.cmd(this.gitRoot, ["add", "."]);
	// 		await gitCmd.cmd(this.gitRoot, ["commit", "-m", "init"]);
	// 		const commitCount = await gitCmd.cmd(this.gitRoot, ["rev-list", "--all", "--count"]);
	//
	// 		expect(fs.existsSync(this.gitPath)).toBe(true);
	// 		expect(commitCount).toBe("1");
	// 	});
	//
	// 	it("should return nothing on --quiet", async function () {
	// 		const result = await gitCmd.init(this.gitRoot);
	//
	// 		expect(result).toBe("");
	// 	});
	//
	// 	it("should return something on verbose", async function () {
	// 		const result = await gitCmd.init(this.gitRoot, true);
	//
	// 		expect(result).not.toBe("");
	// 	});
	//
	// });

});
