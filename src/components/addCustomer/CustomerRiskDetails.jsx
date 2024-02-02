import Answers from "components/Answers";
import Questions from "components/Questions";
import Grid from "components/common/Grid";
import Stack from "components/common/Stack";
import Box from "components/common/Box";

const CustomerRiskDetails = ({
	handleAnswers,
	handleSubmit,
	riskAssesmentQts,
	handlePreviousStep,
	currentQtsId,
	totalQts,
	riskPoints,
	riskDetailsAnswer
}) => {

	const currentOptions = riskAssesmentQts?.options?.find((item) => {
		if (item.questionId === currentQtsId) {
			return item;
		}
		return false;
	});

	return (
		<Box>
			<Grid container>
				<Grid item xs={6}>
					<Stack justifyContent="center" alignItems="center" height="100%">
						<Questions currentQtsId={currentQtsId} qts={riskAssesmentQts?.qts} />
					</Stack>
				</Grid>

				<Grid item xs={6}>
					<Stack justifyContent="center" alignItems="center" height="100%">
						<Answers
							qtsOptions={currentOptions}
							handleAnswers={handleAnswers}
							handlePreviousStep={handlePreviousStep}
							handleSubmit={handleSubmit}
							totalQts={totalQts}
							currentQtsId={currentQtsId}
							riskPoints={riskPoints}
							riskDetailsAnswer={riskDetailsAnswer}
						/>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
};

export default CustomerRiskDetails;
