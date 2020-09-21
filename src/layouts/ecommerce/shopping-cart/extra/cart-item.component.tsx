import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, ListItem, ListItemProps, Text } from '@ui-kitten/components';
import { CloseIcon, MinusIcon, PlusIcon } from './icons';
import { Product } from './data';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

export type CartItemProps = ListItemProps & {
  index: number;
  product: Product;
  onProductChange: (product: Product, index: number) => void;
  onRemove: (product: Product, index: number) => void;
};

export const CartItem = (props: CartItemProps): React.ReactElement => {

  const { style, product, index, onProductChange, onRemove, ...listItemProps } = props;

  
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}


  const decrementButtonEnabled = (): boolean => {
    return product.amount > 1;
  };

  const onRemoveButtonPress = (): void => {
    onRemove(product, index);
  };

  const onMinusButtonPress = (): void => {
    const updatedProduct: Product = new Product(
      product.id,
      product.title,
      product.subtitle,
      product.image,
      product.price,
      product.amount - 1,
    );

    onProductChange(updatedProduct, index);
  };

  const DATA = [
    {
      id: "#440",
      title: "Edition"
    },
    {
      id: "April 01, 2020",
      title: "Launch Date"
    },
    {
      id: "113",
      title: "Pages"
    },
    {
      id: "140MB",
      title: "Size"
    }
  ];

  const _renderItem = ({ item }) => (
    <View style={{ flex: 1}}>

      <Text style={{ textAlign: "center", marginTop: 8, flex: 2 }}>{item.title}</Text>
      <Text style={{ textAlign: "center", marginTop: 8, flex: 2 }}>{item.id}</Text>

    </View>
  );

  const onPlusButtonPress = (): void => {
    const updatedProduct: Product = new Product(
      product.id,
      product.title,
      product.subtitle,
      product.image,
      product.price,
      product.amount + 1,
    );

    onProductChange(updatedProduct, index);
  };

  return (
    <ListItem
      {...listItemProps}
      style={[styles.container, style]}>
      <Image
        style={styles.image}
        source={product.image}
      />
      <View style={styles.detailsContainer}>
        <ScrollView>
          <Text
            category='s1'>
            {product.title}
          </Text>
        </ScrollView>
        <View style={styles.amountContainer}>
          <FlatList
            data={DATA}
            renderItem={_renderItem}
            keyExtractor={item => item.id}
            numColumns={1}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingVertical: 20 }}
          />

        </View>
      </View>
      <Button
        style={[styles.iconButton, styles.removeButton]}
        appearance='ghost'
        status='basic'
        icon={CloseIcon}
        onPress={onRemoveButtonPress}
      />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  image: {
    width: 200,
    height: 240,
  },
  detailsContainer: {
    flex: 1,
    height: '100%',
    padding: 16,
  },
  amountContainer: {
    // position: 'absolute',
    flexDirection: 'row',
    // left: 16,
    // bottom: 16,
  },
  amountButton: {
    borderRadius: 16,
  },
  amount: {
    textAlign: 'center',
    width: 40,
  },
  removeButton: {
    position: 'absolute',
    right: 0,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
