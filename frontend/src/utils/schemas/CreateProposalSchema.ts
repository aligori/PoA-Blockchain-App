import {z} from 'zod';

const isFutureDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    return date > now;
};

// Zod validation for proposal schema, specifying the constraints for title, description and deadline
const createProposalSchema = z.object({
    title: z.string().min(1, {message: 'Please provide a title for the proposal.'}),
    description: z.string().min(1, {message: 'Please provide a detailed description on your proposal.'}),
    deadline: z.string({ message: 'Please provide a deadline for voting.' }).refine((dateString) => {
        return !isNaN(Date.parse(dateString)) && isFutureDate(dateString);
    }, {
        message: 'Deadline for voting should be in the future.',
    }),
});

export {createProposalSchema};
