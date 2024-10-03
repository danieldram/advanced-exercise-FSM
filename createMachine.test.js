import {createMachine} from "./index";

test('The FSM contains a property called value', () => {
    const machine = createMachine({
        initialState: "testState",
        testState: {
            transition: () => "testState"
        }
    })
    expect(machine.value).toBe("testState")
});

test('The FSM contains a property called transition', () => {
    const machine = createMachine({
        initialState: "testState",
        testState: {
            transition: () => "testState"
        }
    })
    expect(machine.transition).toBeDefined();
});

test('The FSM contains a property called mapToTransitions', () => {
    const machine = createMachine({
        initialState: "testState",
        testState: {
            transition: () => "testState"
        }
    })
    expect(machine.mapToTransitions).toBeDefined();
});

test("The FSM transitions to states as expected with binary input modulo three", ()=>{
    const moduloThreeMachine = createMachine({
        initialState: "S0",
        S0: {
            transition: (currentState, bit) => {
                if(currentState === "S0" && bit == "0"){
                    return "S0"
                }else{
                    return "S1"
                }
            }
        },
        S1: {
            transition: (currentState, bit) => {
                if(currentState === "S1" && bit == "0"){
                    return "S2"
                }else{
                    return "S0"
                }
            }
        },
        S2: {
            transition: (currentState, bit) => {
                if(currentState === "S2" && bit == "0"){
                    return "S1"
                }else{
                    return "S2"
                }
            }
        }
    });

    const binaryString = "111";
   
    for(let i = 0; i < binaryString.length; i++){
        const bit = binaryString[i];
        let currentMachineState = moduloThreeMachine.value;
        moduloThreeMachine.value = moduloThreeMachine.transition(currentMachineState, bit);
    }

    expect(moduloThreeMachine.value).toBe("S1");
})

test("The FSM provides a convient mapToTranitions method to execute transtions and manage state based on an input string", ()=>{
    const moduloThreeMachine = createMachine({
        initialState: "S0",
        S0: {
            transition: (currentState, bit) => {
                if(currentState === "S0" && bit == "0"){
                    return "S0"
                }else{
                    return "S1"
                }
            }
        },
        S1: {
            transition: (currentState, bit) => {
                if(currentState === "S1" && bit == "0"){
                    return "S2"
                }else{
                    return "S0"
                }
            }
        },
        S2: {
            transition: (currentState, bit) => {
                if(currentState === "S2" && bit == "0"){
                    return "S1"
                }else{
                    return "S2"
                }
            }
        }
    });

    const binaryString = "1011";
    moduloThreeMachine.mapToTransitions(binaryString)
    expect(moduloThreeMachine.value).toBe("S2");
})