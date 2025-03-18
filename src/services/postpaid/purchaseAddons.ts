import axios from "axios";

const purchaseAddons = async ( packageId: string,subscriberID?: string,) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found in localStorage");
      return null;
    }
    const url = `https://omnitest.slt.com.lk/api/BBVAS/AddVASDataBundlePostPaidV2?subscriberID=${subscriberID}&packageId=${packageId}&commitUser=MySLTWeb&channel=WEB`;

    const response = await axios.post(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.isSuccess && response.data.dataBundle) {
      return response;
    } else {
      console.error("Failed add package");
      return null;
    }
  } catch (error) {
    console.error(`an error occured`, error);
    return null;
  }
};

export default purchaseAddons;
