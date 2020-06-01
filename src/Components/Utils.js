export const cleanIdolGroupName = (name) => {
	switch(name) {
		case "Mu's":
			return "μ's"
		case "Nijigasaki High School Idol Club":
			return "Nijigaku"
		case "Aqours":
			return "Aqours"
		default:
			return "error"
	}
}

export const parseBuffTarget = (card) => {
	var buffType = card.passiveAbility.buffedStat.type;

	console.log(card.passiveAbility.buffTarget.target)

	switch(card.passiveAbility.buffTarget.target) {
		case "self":
			return "Own " + buffType
		case "strategy":
			return "Same strategy's " + buffType
		case "others":
			return "Other cards' " + buffType
		case "all":
			return "All cards' " + buffType
		case "attribute":
			return card.attribute.name + " cards' " + buffType
		case "type":
			return card.type.name + " cards' " + buffType
		case "group":
			return card.idol.idolGroup.name + " cards' " + buffType
		case "school":
			return card.idol.school.name + " cards' " + buffType
		case "year":
			if(card.idol.year === 1) {
				return "1st years' " + buffType
			} else if(card.idol.year === 2) {
				return "2nd years' " + buffType
			} else if(card.idol.year === 3) {
				return "3rd years' " + buffType
			} else return "error"
		case "subunit":
			return card.idol.subunit.name + " cards' " + buffType
		case "name":
			return card.idol.firstName + " cards' " + buffType
		default:
			return "error"
	}
}

export const parsePassiveBuffLevel = (lb) => {
	switch(lb) {
		case "0":
			return "2"
		case "1":
			return "3"
		case "2":
			return "3"
		case "3": 
			return "3"
		case "4":
			return "3"
		case "5":
			return "4"
		default:
			return "error"
	}
}