import { HistoryContainer, HistoryList } from "./styles"

export const History = () => {
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
                        <tr>
                            <td>Tasks</td>
                            <td>20 minutes</td>
                            <td>2 months ago</td>
                            <td>Finished</td>
                        </tr>
                        <tr>
                            <td>Tasks</td>
                            <td>20 minutes</td>
                            <td>2 months ago</td>
                            <td>Finished</td>
                        </tr>
                        <tr>
                            <td>Tasks</td>
                            <td>20 minutes</td>
                            <td>2 months ago</td>
                            <td>Finished</td>
                        </tr>
                        <tr>
                            <td>Tasks</td>
                            <td>20 minutes</td>
                            <td>2 months ago</td>
                            <td>Finished</td>
                        </tr>
                        <tr>
                            <td>Tasks</td>
                            <td>20 minutes</td>
                            <td>2 months ago</td>
                            <td>Finished</td>
                        </tr>
                        <tr>
                            <td>Tasks</td>
                            <td>20 minutes</td>
                            <td>2 months ago</td>
                            <td>Finished</td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}