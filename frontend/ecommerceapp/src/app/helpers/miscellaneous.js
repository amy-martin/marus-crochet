import { Loading } from "../components/miscellaneous/Loading"
import { FailedToLoad } from "../components/miscellaneous/FailedToLoad"


// Function to Check if State is Loading, Loaded or Failed

export const checkState = (toCheck) => {
    if (toCheck === 'Loading') {
        return <Loading />
    } else if (toCheck === 'Failed to Load') {
        return <FailedToLoad />
    } else return null
};



