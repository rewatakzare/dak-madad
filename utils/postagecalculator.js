// utils/postageCalculator.js

/**
 * Calculates the postage fee based on the selected service and input parameters.
 * @param {Object} details - The input details for postage calculation.
 * @returns {string} - The formatted postage fee.
 * @throws {Error} - Throws an error if inputs are invalid.
 */
export function calculatePostage(details) {
    const {
      service,
      postCardType,
      letterWeight,
      bookWeight,
      newsPaperValue,
      newsPaperWeight,
      parcelWeight,
      newsPaperType,
      newsPaperRegWeight,
      amount,
      insuredValue,
      ipoValue,
      rentType,
      isCombined,
      airmailWeight,
    } = details;
  
    let postage = 0;
  
    switch (service) {
      case 'postCard':
        switch (postCardType) {
          case 'single':
            postage = 0.50;
            break;
          case 'reply':
            postage = 1.00;
            break;
          case 'meghdoot':
            postage = 0.25;
            break;
          case 'printed':
            postage = 6.00;
            break;
          default:
            throw new Error('Invalid Post Card Type selected.');
        }
        break;
  
      case 'inlandLetter':
        postage = 2.50;
        break;
  
      case 'letter':
        if (letterWeight > 2000) {
          throw new Error('Error: Weight exceeds 2 Kg limit.');
        } else if (letterWeight > 0) {
          const additionalUnits = Math.ceil(letterWeight / 20);
          postage = additionalUnits * 5.00; // ₹5 for each 20g or part thereof
        } else {
          throw new Error('Error: Please enter a valid weight.');
        }
        break;
  
      case 'bookPattern':
        if (bookWeight > 2500) {
          throw new Error('Error: Weight exceeds the maximum limit of 2.5 kg.');
        } else if (bookWeight > 0) {
          if (bookWeight <= 50) {
            postage = 4.00; // First 50 grams
          } else {
            const additionalWeight = bookWeight - 50;
            const additionalUnits = Math.ceil(additionalWeight / 50); // 50g units
            postage = 4.00 + additionalUnits * 3.00; // ₹3.00 per additional 50g
          }
        } else {
          throw new Error('Error: Please enter a valid weight.');
        }
        break;
  
      case 'bookPacket':
        if (bookWeight > 0) {
          if (bookWeight <= 100) {
            postage = 1.00; // First 100 grams
          } else {
            const additionalWeight = bookWeight - 100;
            const additionalUnits = Math.ceil(additionalWeight / 100); // 100g units
            postage = 1.00 + additionalUnits * 1.00; // ₹1.00 per additional 100g
          }
        } else {
          throw new Error('Error: Please enter a valid weight.');
        }
        break;
  
      case 'newsPaper':
        if (newsPaperValue > 0 && newsPaperWeight > 0) {
          if (newsPaperValue >= 1 && newsPaperValue <= 20) {
            postage = 2.00;
            if (newsPaperWeight > 100) {
              const additionalUnitsNP = Math.ceil((newsPaperWeight - 100) / 100);
              postage += additionalUnitsNP * 3.00; // ₹3.00 for every additional 100g
            }
          } else if (newsPaperValue >= 21 && newsPaperValue <= 50) {
            postage = 4.00;
            if (newsPaperWeight > 100) {
              const additionalUnitsNP = Math.ceil((newsPaperWeight - 100) / 100);
              postage += additionalUnitsNP * 5.00; // ₹5.00 for every additional 100g
            }
          } else if (newsPaperValue >= 51) {
            postage = 8.00;
            if (newsPaperWeight > 100) {
              const additionalUnitsNP = Math.ceil((newsPaperWeight - 100) / 100);
              postage += additionalUnitsNP * 9.00; // ₹9.00 for every additional 100g
            }
          } else {
            throw new Error('Error: Invalid value entered for periodical.');
          }
        } else {
          throw new Error('Error: Please enter valid value and weight.');
        }
        break;
  
      case 'parcel':
        if (parcelWeight > 0) {
          if (parcelWeight <= 500) {
            postage = 19.00; // For weight not exceeding 500g
          } else {
            const excessWeight = parcelWeight - 500;
            const additionalUnitsParcel = Math.ceil(excessWeight / 500); // 500g units
            postage = 19.00 + additionalUnitsParcel * 16.00; // ₹16.00 for every additional 500g
          }
        } else {
          throw new Error('Error: Please enter a valid weight.');
        }
        break;
  
      case 'newsPaperRegistered':
        if (newsPaperRegWeight > 0 && newsPaperType) {
          if (newsPaperType === 'singleCopy') {
            if (newsPaperRegWeight <= 50) {
              postage = 0.25;
            } else if (newsPaperRegWeight <= 100) {
              postage = 0.50;
            } else {
              const additionalUnitsNPR = Math.ceil((newsPaperRegWeight - 100) / 100);
              postage = 0.50 + additionalUnitsNPR * 0.20; // ₹0.20 for every additional 100g
            }
          } else if (newsPaperType === 'multipleCopies') {
            if (newsPaperRegWeight <= 100) {
              postage = 0.50;
            } else {
              const additionalUnitsNPRM = Math.ceil((newsPaperRegWeight - 100) / 100);
              postage = 0.50 + additionalUnitsNPRM * 0.20; // ₹0.20 for every additional 100g
            }
          } else {
            throw new Error('Error: Invalid newspaper type selected.');
          }
        } else {
          throw new Error('Error: Please enter a valid weight and select newspaper type.');
        }
        break;
  
      case 'electronicMoneyOrder':
        if (amount >= 20) {
          const unitsEMO = Math.ceil(amount / 20); // Round up to the nearest ₹20
          postage = unitsEMO * 1.00; // ₹1.00 for every ₹20 or fraction thereof
        } else if (amount > 0) {
          postage = 1.00; // For amounts less than ₹20 but greater than 0
        } else {
          throw new Error('Error: Please enter a valid amount.');
        }
        break;
  
      case 'insurance':
        if (insuredValue > 0) {
          if (insuredValue <= 5000) {
            postage = 25.00;
          } else if (insuredValue <= 10000) {
            postage = 50.00;
          } else {
            postage = 75.00;
          }
        } else {
          throw new Error('Error: Please enter a valid insured value.');
        }
        break;
  
      case 'indianPostalOrder':
        if (ipoValue > 0) {
          if (ipoValue <= 10) {
            postage = 1.00;
          } else if (ipoValue <= 20) {
            postage = 2.00;
          } else if (ipoValue <= 50) {
            postage = 5.00;
          } else if (ipoValue <= 100) {
            postage = 10.00;
          } else {
            postage = 10.00; // Assuming ₹10 for values above ₹100
          }
        } else {
          throw new Error('Error: Please enter a valid IPO value.');
        }
        break;
  
      case 'postalIdCard':
        postage = 9.00; // Fixed fee
        break;
  
      case 'businessReplyPermit':
        postage = 1.00; // Fixed fee
        break;
  
      case 'airmail':
        if (airmailWeight > 0) {
          if (airmailWeight <= 50) {
            postage = 2.00; // For the first 50 grams
          } else {
            const additionalUnitsAirmail = Math.ceil((airmailWeight - 50) / 50);
            postage = 2.00 + additionalUnitsAirmail * 1.00; // ₹1.00 for every additional 50 grams
          }
        } else {
          throw new Error('Error: Please enter a valid weight.');
        }
        break;
  
      case 'recall':
        postage = 6.00; // Fixed fee
        break;
  
      case 'rent':
        if (rentType) {
          if (isCombined) {
            if (rentType === 'full') {
              postage = 250.00; // Full year combined
            } else if (rentType === 'quarter') {
              postage = 80.00; // Quarter combined
            } else {
              throw new Error('Error: Invalid rent type selected.');
            }
          } else {
            if (rentType === 'full') {
              postage = 150.00; // Full year separate
            } else if (rentType === 'quarter') {
              postage = 50.00; // Quarter separate
            } else {
              throw new Error('Error: Invalid rent type selected.');
            }
          }
        } else {
          throw new Error('Error: Please select a rent type.');
        }
        break;
  
      case 'receiptCopy':
        postage = 0.00; // Assuming no fee or specify accordingly
        break;
  
      default:
        throw new Error('Error: Unknown service selected.');
    }
  
    // Format postage for display
    if (typeof postage === 'number') {
      return `₹${postage.toFixed(2)}`;
    }
  
    return postage;
  }
  