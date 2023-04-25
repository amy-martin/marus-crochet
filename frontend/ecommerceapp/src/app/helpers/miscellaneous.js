import { Loading } from "../components/Loading"
import { FailedToLoad } from "../components/FailedToLoad"

// Function to Check if State is Loading, Loaded or Failed



export const checkState = (toCheck) => {
    if (toCheck === 'Loading') {
        return <Loading />
    } else if (toCheck == 'Failed to Load') {
        return <FailedToLoad />
    } else {
        return null
    }
}