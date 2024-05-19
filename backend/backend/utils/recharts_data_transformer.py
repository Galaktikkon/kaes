class RechartsDataTransformer:

    @staticmethod
    def get_transformed_data(data):

        helper = {}

        for entry in data:
            date = entry["date"]
            if date not in helper:
                if entry["result"]:
                    helper[date] = {"correct": 1, "incorrect": 0}
                else:
                    helper[date] = {"correct": 0, "incorrect": 1}
            else:
                if entry["result"]:
                    helper[date]["correct"] += 1
                else:
                    helper[date]["incorrect"] += 1

        output = []
        for date in list(helper.keys()):
            output.append(
                {
                    "date": date,
                    "correct": helper[date]["correct"],
                    "incorrect": helper[date]["incorrect"]
                }
            )

        return output
