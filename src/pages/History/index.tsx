import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";
import { formatDistanceToNow } from "date-fns";

export function History() {
    const { cycles } = useContext(CyclesContext)

    return (
        <HistoryContainer>
            <h1>My history</h1>

            <pre>
                {JSON.stringify(cycles, null, 2)}
            </pre>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Duration</th>
                            <th>Start</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map(cycle => {
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount} minutes</td>
                                    <td>{formatDistanceToNow(cycle.startDate, {
                                        addSuffix: true
                                    })}</td>
                                    <td>
                                        { cycle.finishedDate && 
                                            <Status statusColor="green">Completed</Status> 
                                        }
                                        { cycle.interruptDate && 
                                            <Status statusColor="red">Interrupted</Status> 
                                        }
                                        {!cycle.finishedDate && ! cycle.interruptDate &&
                                             <Status statusColor="yellow">In progress</Status> 
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                
            </HistoryList>
        </HistoryContainer>
    )
        
}