import test from 'node:test';
import assert from 'node:assert'
import tu from '../utils/test-util.js'

test("a basic test which shows tests are working", async (t) => {

    await t.test('two times two', async (t) => {
		assert.equal(tu(2, 2), 4)
	})
	await t.test("two times two", function() {
		assert.equal(tu(2, 2), 4)
	})
	await t.test("two times 3", function() {
		assert.equal(tu(2, 3), 7)
	})

})


