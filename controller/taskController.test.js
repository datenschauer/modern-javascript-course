import { jest } from '@jest/globals'
import { addTask } from './taskController.js';

describe('test function add', () => {
    const add = (m, n) => m + n;
    it('1 + 2 should equal 3', () => {
        expect(add(1, 2)).toBe(4);
    })
})

describe('Task Controller', () => {
    it('should add a task', async () => {
        const mockTaskRepo = {
            addTask: jest.fn().mockResolvedValue(true),
        };

        const req = {
            body: {
                text: 'New task',
            },
        };

        const res = {
            json: jest.fn(),
        };

        await addTask(mockTaskRepo)(req, res);

        // Assert the invocation of mockTaskRepo.addTask()
        expect(mockTaskRepo.addTask).toHaveBeenCalledTimes(1);

        // Assert the invocation of res.json()
        expect(res.json).toHaveBeenCalledTimes(1);
    });

    // Add more test cases for other controller functions as needed
});