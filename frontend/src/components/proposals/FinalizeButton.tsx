import Button from "@/core/button/Button"
import { useProposalContract } from "@/hooks/useProposalContract";
import { useAppDispatch } from "@/redux/hooks";
import { hideLoader, showLoader } from "@/redux/slices/loaderSlice";
import { showError, showSuccess } from "@/utils/helpers";
import { MdOutlineGavel } from "react-icons/md";

const FinalizeButton = ({ proposalId, onUpdate }: { proposalId: string, onUpdate: () => {} }) => {
    const { finalizeProposal } = useProposalContract();

    const dispatch = useAppDispatch();

    const finalize = async () => {
        try {
            dispatch(showLoader());
            await finalizeProposal(+proposalId);
            showSuccess('Decision finalized!!!')
            onUpdate();
        } catch (err) {
            showError('Error finalizing decision!')
            console.log('An error occurred', err)
        } finally {
            dispatch(hideLoader());
        }
    };

    return (
        <Button
            label={
                <div className="flex items-center">
                    <MdOutlineGavel className="mr-1"/>
                    Finalize
                </div>
            }
            size="md"
            bgColor="bg-emerald-500 hover:bg-emerald-400"
            onClick={finalize}
        />
    )
}

export default FinalizeButton