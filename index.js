
/**
 * createMachine: Factory method
 * Generates a basic FSM Machine where the state of the machine is within the value property. 
 * @Param machineConfig - {initialState:string, [key]:{transition:(currentState: string, input:string)=>key: string}}
 * @Returns machine {value:string. mapToTransitions: (inputString:string) => machine.value, transitions:(machine.value, input:string) => machine.value}
 */
export const createMachine = (machineConfig) => {

    const machine = {
        /**
         * value: current state of the machine
         */
        value: machineConfig.initialState,
        /**
         * mapToToTransitions: A convenient method fo developers to quickly map an input string to current states within the machine.
         */
        mapToTransitions: (inputString) => {
            for(let i = 0; i < inputString.length; i++){
                const currentState = machine.value;
                const bit = inputString[i];
                const currentStateDefinition = machineConfig[currentState];
                machine.value = currentStateDefinition.transition(currentState, bit)
            }
            return machine.value;
        },
        /**
         * The transition method that will move the state of the machine to other finite expected states and return the current state of the machine.
         */
        transition: (currentState, input) => {
            const currentStateDefinition = machineConfig[currentState];
            machine.value = currentStateDefinition.transition(currentState, input)
            return machine.value;
        }
    }
    return machine;
};