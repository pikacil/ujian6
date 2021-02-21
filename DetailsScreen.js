function DetailsScreen({ route, navigation }) {
    const { itemId } = route.params;
    const { otherParam } = route.params;
    const { name } = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Text>Name : {JSON.stringify(name)}</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} color="red" />
      </View>
    );
  }