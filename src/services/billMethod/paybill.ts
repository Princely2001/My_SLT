// services/billMethod/PaymentServiceRequest.ts
import axios from "axios";


class PaymentServiceRequest {
  private apiUrl: string =
    "https://billpay.slt.lk/bbtopup/summaryallAPImyslt.php";

  async submitPayment({
    custEmail,
    contactNumber,
    subscriberID,
    prepaidID = "",
    packageId = "",
    reciever = "",
  }: {
    custEmail: string;
    contactNumber: string;
    subscriberID: string;
    prepaidID?: string;
    packageId?: string;
    reciever?: string;
  }): Promise<any> {
    const postData = new URLSearchParams({
      CustEmail: "",
      vpc_Amount :"Rs.2000.00",
      ContactNumber:"0342277001",
      subscriberID : "94342277001",
      prepaidID,
      reciever,
      packageId,
      channel: "SLTPRE",
      commitUser: "Omni",
      reporterPackage: "",
      activatedBy: "94342277001",
      callbackURLSLT: "",
    });

    try {
      const response = await axios.post(this.apiUrl, postData.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("✅ Payment Response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "❌ Payment Error:",
        error.response?.status || "Unknown Status",
        error.response?.data || error.message
      );
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  }
}

export default PaymentServiceRequest;