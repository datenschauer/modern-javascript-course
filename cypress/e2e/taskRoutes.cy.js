const UUID_REGEX = /[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;

describe('Task Routes', () => {
    it('should retrieve tasks', () => {
        cy.request('GET', '/api/tasks').then((response) => {
            // Assert the response status code
            expect(response.status).to.equal(200);

            // Assert the response body or specific properties
            expect(response.body[0]).to.have.property('id');
            expect(response.body[0]).to.have.property('text').that.is.a('string');
        });
    });

    it('should add a task', () => {
        cy.request('POST', '/api/tasks', { text: 'New task' }).then((response) => {
            // Assert the response status code
            expect(response.status).to.equal(200);

            // Assert the response body or specific properties
            expect(response.body.id).to.be.a('string');
            expect(response.body.text).to.be.a('string');
            // Assert the response text
            expect(response.body.text).to.equal('New task');
            // Assert that the response is a uuid
            expect(response.body.id).to.match(UUID_REGEX);
        });
    });

    let taskId = null;
    before('add a task to test against', () => {
        cy.request('POST', '/api/tasks', { text: 'To be deleted task'} ).then((response) => {
            taskId = response.body.id;
        })
    })
    it('should delete a task', () => {
        cy.request('DELETE', `/api/task/${taskId}`).then((response) => {
            expect(response.body).to.be.equal(taskId);
        })
    })

    // Add more test cases for other routes as needed
});