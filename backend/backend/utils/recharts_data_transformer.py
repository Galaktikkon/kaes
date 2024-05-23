from .get_config_data import get_config_data


class RechartsDataTransformer:

    @staticmethod
    def get_transformed_all_data(data):

        helper = {}

        for entry in data:
            date = entry["date"]

            if date not in helper:
                helper[date] = {
                    "correct": int(entry["result"]),
                    "incorrect": int(entry["result"])
                }

            else:
                helper[date]["correct"] += int(entry["result"])

        transformed_data = []
        for date in list(helper.keys()):
            transformed_data.append(
                {
                    "date": date,
                    "correct": helper[date]["correct"],
                    "incorrect": helper[date]["incorrect"]
                }
            )

        return transformed_data

    @staticmethod
    def get_transformed_param_data(data, query_param):
        config = get_config_data()

        translator_dict = config["Stats query params"][query_param]

        helper = {}

        for entry in data:
            type_name = translator_dict[entry["sequence_type"]]

            if type_name not in helper:
                helper[type_name] = int(entry["result"])
            else:
                helper[type_name] += int(entry["result"])

        transformed_data = []
        for param in list(helper.keys()):
            transformed_data.append(
                {
                    "type": param,
                    "value": helper[param]
                }
            )

        top = len(data)

        return top, transformed_data
