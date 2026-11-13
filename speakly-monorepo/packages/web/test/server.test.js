// Тести веб-сервера: перевірка шляхів (білий список) і реальні відповіді сервера.

import { test } from "node:test";
import assert from "node:assert/strict";
import { createAppServer, resolveFilePath } from "../server.js";

test("resolveFilePath: головна сторінка та файли ядра дозволені", () => {
    assert.ok(resolveFilePath("/").endsWith("index.html"));
    assert.ok(resolveFilePath("/?x=1").endsWith("index.html"));
    assert.ok(resolveFilePath("/index.html").endsWith("index.html"));
    assert.ok(resolveFilePath("/style.css").endsWith("style.css"));
    assert.ok(resolveFilePath("/script.js").endsWith("script.js"));
    assert.ok(resolveFilePath("/localStorageAdapter.js").endsWith("localStorageAdapter.js"));
    assert.ok(resolveFilePath("/node_modules/@speakly/core/index.js").endsWith("index.js"));
});

test("resolveFilePath: вихід за межі теки та серверні файли заборонені", () => {
    const forbidden = [
        "/server.js",
        "/package.json",
        "/../package.json",
        "/test/server.test.js",
        "/node_modules/@speakly/core/package.json",
        "/node_modules/@speakly/core/test/wordsService.test.js",
        "/node_modules/@speakly/core/../index.js",
        "/%E0%A4%A",
    ];

    for (const urlPath of forbidden) {
        assert.equal(resolveFilePath(urlPath), null, `має бути заборонено: ${urlPath}`);
    }
});

test("сервер віддає index.html і модуль ядра з правильними типами, а server.js — 404", async () => {
    const server = createAppServer();
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const { port } = server.address();
    const base = `http://127.0.0.1:${port}`;

    try {
        const page = await fetch(`${base}/`);
        assert.equal(page.status, 200);
        assert.match(page.headers.get("content-type"), /text\/html/);

        const core = await fetch(`${base}/node_modules/@speakly/core/index.js`);
        assert.equal(core.status, 200);
        assert.match(core.headers.get("content-type"), /text\/javascript/);

        for (const urlPath of ["/server.js", "/package.json"]) {
            const response = await fetch(`${base}${urlPath}`);
            assert.equal(response.status, 404);
        }
    } finally {
        server.closeAllConnections?.();
        await new Promise((resolve) => server.close(resolve));
    }
});