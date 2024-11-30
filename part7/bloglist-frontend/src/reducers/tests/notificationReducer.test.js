import notificationReducer from "../notificationReducer"



jest.useFakeTimers();

describe('notificationReducer', () => {
    test('checks to see if reducer displays message', () => {
        const state = []
        const action = {
            type: 'notification/setMessage',
            payload: "The message has been set"
        }

        const action2 = {
            type: 'notification/setEmpty'

        }

        const notificationSetter = notificationReducer(state, action)
        

        expect(notificationSetter).toBe("The message has been set")
        const notifcationSetter2 = notificationReducer(state, action2)
        expect(notifcationSetter2).toBe("")

        

    })
})