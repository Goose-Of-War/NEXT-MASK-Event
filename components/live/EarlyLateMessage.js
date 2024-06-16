import MessageCard from "./utils/MessageCard";

export default function EarlyLateMessage ({ late }) {
	return (
		<MessageCard
			message={
				late ? 'The quiz has already ended.' : 'The quiz is yet to start.'
			}
		/>
	);
}
