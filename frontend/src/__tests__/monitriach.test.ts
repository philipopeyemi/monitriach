import { opportunityService } from "../services/opportunityService";
import { leadService } from "../services/leadService";
import { campaignService } from "../services/campaignService";
import { notificationService } from "../services/notificationService";

export function runMonitriachRegressionChecks() {
  console.assert(typeof opportunityService.getOpportunities === "function", "opportunityService.getOpportunities missing");
  console.assert(typeof opportunityService.createOpportunity === "function", "opportunityService.createOpportunity missing");
  console.assert(typeof opportunityService.updateOpportunity === "function", "opportunityService.updateOpportunity missing");
  console.assert(typeof opportunityService.deleteOpportunity === "function", "opportunityService.deleteOpportunity missing");

  console.assert(typeof leadService.getLeads === "function", "leadService.getLeads missing");
  console.assert(typeof leadService.createLead === "function", "leadService.createLead missing");
  console.assert(typeof leadService.updateLead === "function", "leadService.updateLead missing");
  console.assert(typeof leadService.deleteLead === "function", "leadService.deleteLead missing");

  console.assert(typeof campaignService.getCampaigns === "function", "campaignService.getCampaigns missing");
  console.assert(typeof campaignService.createCampaign === "function", "campaignService.createCampaign missing");
  console.assert(typeof campaignService.updateCampaign === "function", "campaignService.updateCampaign missing");
  console.assert(typeof campaignService.deleteCampaign === "function", "campaignService.deleteCampaign missing");

  console.assert(typeof notificationService.getNotifications === "function", "notificationService.getNotifications missing");
  console.assert(typeof notificationService.createNotification === "function", "notificationService.createNotification missing");
}
