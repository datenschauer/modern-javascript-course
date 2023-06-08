describe('index.html', () => {
    describe('Task App', () => {
        it('should show an input field with add button', () => {
            cy.visit('/');
            cy.get('[data-test="newTaskInput"]');
            cy.get('#new-task-submit');
        });

        let tasksLength = null;
        before('fetch tasks', () => {
            cy.request('GET', '/api/tasks').then((response) => {
                if (response) {
                    tasksLength = response.body.length;
                } else {
                    throw new Error("Connection to fetch tasks couldn't be established.")
                }
            });
        });
        it('should show same amount of tasks as in db', () => {
            cy.visit('/');
            cy.get('[data-test="taskElement"]').should('have.length', tasksLength);
        });

        it('should show delete and edit buttons for all tasks', () => {
            cy.visit('/');
            cy.get('[data-test="taskEditButton"]').should('have.length', tasksLength);
            cy.get('[data-test="taskDeleteButton"]').should('have.length', tasksLength);
        });

        it('should add a task', () => {
            let taskText = "New submitted Task from Frontend";
            cy.visit('/');
            cy.get('[data-test="newTaskInput"]').type(taskText);
            cy.get('[data-test="newTaskForm"]').submit();
            cy.get('[data-test="taskInput"]').last().invoke('val').should('eq', taskText);
        });

        it('should update a task', () => {
            // to be implemented
        });

        it('should delete a task', () => {
            // to be implemented
        })
    });
});