import React from 'react';
import { Card, Icon, Avatar, List } from 'antd';
import './Compagnies.css';

const { Meta } = Card;


const CompagniesComponent = ({ dataSource }) => {

    const Compagnies = dataSource ? (
        <List
            grid={{
                gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3
            }}
            dataSource={dataSource}
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 9,
            }}
            renderItem={item => (
            <List.Item>
                <Card
                    style={{ width: '100%' }}
                    >
                    <Meta
                        avatar={<Avatar src={item._source.picture} />}
                        title={
                            (
                                <strong>{item._source.company}</strong>
                            )
                        }
                        description={
                            (
                                <div className="item-description">
                                    <p>
                                        <Icon type="phone" />
                                        <span>{item._source.phone}</span>
                                    </p>
                                    <p>
                                        <Icon type="mail" />
                                        <span>{item._source.email}</span>
                                    </p>
                                    <p>
                                        <Icon type="environment" />
                                        <span>{item._source.address}</span>
                                    </p>
                                </div>
                            )
                        }
                    />
                </Card>
            </List.Item>
            )}
        />
    ) : (
        <h1>You don't have any data</h1>
    )

    return (
        <div>
            { Compagnies }
        </div>
    )
}

export default CompagniesComponent;