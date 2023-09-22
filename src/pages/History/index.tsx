import { useContext } from "react"
import { HistoryContainer, HistoryList, Status } from "./styles"
import { CyclesContext } from "../../contexts/CyclesContext"
import { formatDistanceToNow } from "date-fns"

export const History = () => {
    const { cycles } = useContext(CyclesContext)

    return (
        <HistoryContainer>
            <h1>My Historics</h1>
            
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tasks</th>
                            <th>Time</th>
                            <th>Start</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map(cycle => {
                            return(
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount} minutes</td>
                                    <td>
                                        {formatDistanceToNow(cycle.startDate, {
                                            addSuffix: true
                                        })}
                                    </td>
                                    <td>
                                        {cycle.finishedDate && (
                                            <Status statusColor='green'>Finished</Status>
                                        )}
                                        {cycle.interruptedDate && (
                                            <Status statusColor='red'>Interruped</Status>
                                        )}
                                        {!cycle.finishedDate && !cycle.interruptedDate && (
                                            <Status statusColor='yellow'>In progress</Status>
                                        )}

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