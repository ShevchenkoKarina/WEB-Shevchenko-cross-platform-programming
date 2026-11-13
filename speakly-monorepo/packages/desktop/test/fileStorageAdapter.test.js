// Тести файлового адаптера. Тимчасову теку створюємо через fs.mkdtemp у os.tmpdir().

import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { WordsService } from "@speakly/core";
import { FileStorageAdapter } from "../fileStorageAdapter.js";

async function withTempDir(run) {
    const dir = await mkdtemp(path.join(os.tmpdir(), "speakly-"));
    try {
        await run(dir);
    } finally {
        await rm(dir, { recursive: true, force: true });
    }
}

test("load повертає [], якщо файлу немає", async () => {
    await withTempDir(async (dir) => {
        const adapter = new FileStorageAdapter(path.join(dir, "words.json"));

        assert.deepEqual(await adapter.load(), []);
    });
});

test("save створює теку та файл, load читає дані назад", async () => {
    await withTempDir(async (dir) => {
        const adapter = new FileStorageAdapter(path.join(dir, "nested", "words.json"));
        const words = [{ id: 1, word: "laptop", createdAt: "2026-11-13T10:00:00.000Z" }];

        await adapter.save(words);

        assert.deepEqual(await adapter.load(), words);
    });
});

test("load повертає [] для пошкодженого файлу", async () => {
    await withTempDir(async (dir) => {
        const filePath = path.join(dir, "words.json");
        await writeFile(filePath, "{broken json", "utf-8");
        const adapter = new FileStorageAdapter(filePath);

        assert.deepEqual(await adapter.load(), []);
    });
});

test("адаптер працює зі спільним WordsService", async () => {
    await withTempDir(async (dir) => {
        const service = new WordsService(
            new FileStorageAdapter(path.join(dir, "words.json"))
        );

        const result = await service.add("laptop");
        const words = await service.list();

        assert.equal(result.ok, true);
        assert.equal(words.length, 1);
        assert.equal(words[0].word, "laptop");
    });
});