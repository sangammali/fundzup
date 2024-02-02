import React, { useState } from "react";
import CustomGrid from "components/datagrid/CustomGrid";
import ImportIcon from "asset/icons/ImportIcon";
import Button from "components/common/Button";
import NewDialog from "components/common/Dialog";
import Box from "components/common/Box";
import Image from "components/common/Image";
import Stack from "components/common/Stack";
import FileUpload from "components/common/DragNdDrop";
import Text from "components/common/Text";
import { modelTableRows, modelTableColumns } from "helpers/constants";

const ImportDrawer = (props) => {
  const { handleProceedToSelectCustomers } = props;
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [congratsModalOpen, setCongratsModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [riskProfileDialogOpen, setRiskProfileDialogOpen] = useState(false);
  const [selectedRiskProfile, setSelectedRiskProfile] = useState(null);

  const handleRiskProfileClick = (riskProfile) => {
    setSelectedRiskProfile(riskProfile);
  };

  const handleSave = () => {
    setSaveModalOpen(true);
    setCongratsModalOpen(false);
    setImportModalOpen(false);
  };

  const handleCancel = () => {
    setSaveModalOpen(false);
    setCongratsModalOpen(false);
    setImportModalOpen(false);
  };

  const handleSelectRiskProfile = () => {
    setRiskProfileDialogOpen(true);
    setCongratsModalOpen(false);
    setSaveModalOpen(false);
    setImportModalOpen(false);
  };

  return (
    <>
      <>
        <Button
          sx={{
            fontWeight: 500,
            borderRadius: "8px",
            borderColor: "#D0D5DD",
            p: 1,
          }}
          variant="outlined"
          startIcon={<ImportIcon />}
          onClick={() => {
            setImportModalOpen(true);
          }}
        >
          Import
        </Button>

        <NewDialog
          onClose={() => setImportModalOpen(false)}
          open={importModalOpen}
          title={
            <Text fontSize="18px" fontWeight="600" marginBottom="-15px">
              Upload and attach file
            </Text>
          }
          disableCloseIcon
          maxWidth="sm"
          contentComponent={() => (
            <Box>
              <Text
                fontSize="14px"
                fontWeight="500"
                color="#667085"
                mt="2px"
                mb="16px"
              >
                Rorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>

              <FileUpload />

              <Stack
                direction="row"
                justifyContent="space-around"
                marginTop="10px"
              >
                <Button
                  sx={{
                    width: "50%",
                    fontWeight: 600,
                    borderRadius: "8px",
                    p: "15px 20px",
                    mr: 1,
                    mt: "10px",
                  }}
                  variant="outlined"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  sx={{
                    width: "50%",
                    fontWeight: 600,
                    borderRadius: "8px",
                    p: "15px 20px",

                    ml: 1,
                    mt: "10px",
                  }}
                  onClick={handleSave}
                >
                  Attach Files
                </Button>
              </Stack>
            </Box>
          )}
        />

        <NewDialog
          onClose={() => setSaveModalOpen(false)}
          open={saveModalOpen}
          title={
            <Text fontSize="18px" fontWeight="500">
              Preview of your excel file
            </Text>
          }
          disableCloseIcon
          maxWidth="xl"
          contentComponent={() => (
            <div>
              <CustomGrid
                autoHeight
                list={modelTableRows}
                columnHeaderHeight={46}
                rowHeight={46}
                columns={modelTableColumns}
                rowCount={modelTableRows.length}

                // pagination={true}
              />
            </div>
          )}
          actionComponent={() => (
            <Stack
              direction="row"
              justifyContent="flex-end"
              style={{ backgroundColor: "#E5EEFF", margin: "10px" }}
            >
              <Button
                sx={{
                  width: "160px",
                  fontWeight: 600,
                  borderRadius: "8px",
                  fontSize: "14px",
                  p: "14px 28px",
                  m: 2,
                  backgroundColor: "#FFF",
                }}
                variant="outlined"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  // width: "30%",
                  fontWeight: 600,
                  borderRadius: "8px",
                  fontSize: "14px",
                  p: "14px 28px",
                  m: 2,
                }}
                onClick={handleSelectRiskProfile}
              >
                Proceed to select risk profile
              </Button>
            </Stack>
          )}
        />

        <NewDialog
          onClose={() => setRiskProfileDialogOpen(false)}
          open={riskProfileDialogOpen}
          title={
            <Text
              fontSize="20px"
              fontWeight="600"
              marginBottom="20px"
              marginTop="20px"
              marginLeft="30px"
            >
              Select one risk profile of the customers to whom the following
              trade will apply
            </Text>
          }
          disableCloseIcon
          maxWidth="lg"
          contentComponent={() => (
            <Stack
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {/* Card 1 */}
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                onClick={() => handleRiskProfileClick("aggressive")}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "50px",
                  width: "250px",
                  height: "60px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedRiskProfile === "aggressive"
                      ? "#F7F8FF"
                      : "transparent",
                }}
              >
                <Image src="/images/aggressive.svg" />
                <Text
                  fontSize="20px"
                  fontWeight="500"
                  color="red"
                  sx={{ mt: 2 }}
                >
                  Agressive risk profile
                </Text>
              </Stack>

              {/* Card 2 */}
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                onClick={() => handleRiskProfileClick("moderate")}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "50px",
                  width: "250px",
                  height: "60px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedRiskProfile === "moderate"
                      ? "#F7F8FF"
                      : "transparent",
                }}
              >
                <Image src="/images/moderate.svg" />
                <Text
                  fontSize="20px"
                  fontWeight="500"
                  color="orange"
                  sx={{ mt: 2 }}
                >
                  Moderate risk profile
                </Text>
              </Stack>
              {/* Card 3 */}
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                onClick={() => handleRiskProfileClick("conservative")}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "50px",
                  width: "250px",
                  height: "60px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedRiskProfile === "conservative"
                      ? "#F7F8FF"
                      : "transparent",
                }}
              >
                <Image src="/images/conservative.svg" />
                <Text
                  fontSize="20px"
                  fontWeight="500"
                  color="green"
                  sx={{ mt: 2 }}
                >
                  Conservative risk profile
                </Text>
              </Stack>
            </Stack>
          )}
          actionComponent={() => (
            <Stack alignItems="flex-end">
              <Button
                sx={{
                  fontWeight: 600,
                  borderRadius: "8px",
                  fontSize: "14px",
                  p: "14px 28px",
                  width: "40%",
                  mb: 6,
                  mr: 6,
                  mt: 2,
                }}
                onClick={handleProceedToSelectCustomers}
              >
                Proceed to select customers
              </Button>
            </Stack>
          )}
        />
      </>
    </>
  );
};

export default ImportDrawer;
