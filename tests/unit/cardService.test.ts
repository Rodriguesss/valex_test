import { jest } from "@jest/globals"
import companyService from "../../src/services/companyService";
import cardService from "../../src/services/cardService";
import employeeService from "../../src/services/employeeService";
import cardRepository, { Card } from "../../src/repositories/cardRepository";

// create
describe("create service ", () => {
  it("should created card", async () => {
    jest.spyOn(companyService, 'validateApiKeyOrFail').mockResolvedValue();

    jest.spyOn(employeeService, 'getById').mockResolvedValue({
      id: 1,
      fullName: 'Vinicius',
      cpf: '12345678901',
      email: 'vinicius@gmail.com',
      companyId: 1,
    });

    jest.spyOn(cardRepository, 'findByTypeAndEmployeeId').mockImplementation(() => null);
    jest.spyOn(cardRepository, 'insert').mockImplementation(() => null);

    const result = await cardService.create('123456', 3, "restaurant");

    expect(result).toBeUndefined();
    expect(cardRepository.insert).toBeCalled();
  });

  it("should conflict", async () => {
    jest.spyOn(companyService, 'validateApiKeyOrFail').mockResolvedValue();

    jest.spyOn(employeeService, 'getById').mockResolvedValue({
      id: 1,
      fullName: 'Vinicius',
      cpf: '12345678901',
      email: 'vinicius@gmail.com',
      companyId: 1,
    });
    
    const cardData: Card = {
      id: 1,
      employeeId: 1,
      number: '123456',
      cardholderName: "Vinicius R Freitas",
      securityCode: "012",
      expirationDate: "01/2028",
      isVirtual: false,
      isBlocked: false,
      type: "restaurant"
    }

    jest.spyOn(cardRepository, 'findByTypeAndEmployeeId').mockResolvedValue(cardData);

    const insert = jest.spyOn(cardRepository, 'insert').mockImplementation(() => null);

    const result = await cardService.create('123456', 1, "restaurant");

    expect(result).toHaveProperty('type', 'conflict');
  });
})

//describe("active")

// generateCardData

// getMiddleNameInitial

// filterTwoLetterMiddleName

// formatCardholderName

// getHashedSecurityCode

// activate

// validateExpirationDateOrFail

// getById

// validateCVCOrFail

// validatePasswordOrFail