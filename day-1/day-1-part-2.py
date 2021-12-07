file = open("/input", "r")
data = file.read().splitlines()
parsed_data = [int(i) for i in data]
count = -1
previous_sum = 0
current_sum = 0
for index, value in enumerate(parsed_data):
    if index < len(parsed_data) - 2:
        current_sum = sum(parsed_data[index : index + 3])
        if current_sum > previous_sum:
            count += 1
        previous_sum = current_sum

print(count)
