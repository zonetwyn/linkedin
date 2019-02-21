import React, { Component } from 'react';
import { Card, Icon, Avatar, List, Modal, Row, Col, Divider } from 'antd';
import './Employees.css';

const { Meta } = Card;


class EmployeesComponent extends Component {

    state = {
        item: null,
        visible: false
    }

    showModal = (item) => {
        this.setState({
            visible: true,
            item: item
        });
    }

    handleOk = () => {
        this.setState({
            visible: false
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    
    render () {
        const { dataSource } = this.props;
        const { visible } = this.state;

        const Employees = dataSource ? (
            <List
                grid={{
                    gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3
                }}
                dataSource={dataSource}
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 9
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
                                    <div style={{ width: '100%' }}>
                                        <strong>{item._source.name.first + ' ' + item._source.name.last}</strong>
                                        <span style={{ cursor: 'pointer', color: 'gray', float: 'right' }} onClick={() => this.showModal(item)}>Details</span>
                                    </div>
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
                                            <Icon type="tag" />
                                            <span>{item._source.job_title}</span>
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
                { Employees }
                <Modal
                    title={
                        (
                            <strong>Client details</strong>
                        )
                    }
                    visible={visible}
                    width={520}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    >
                    {
                        (this.state.item) ? (
                            <div className="details">
                                <div className="details-img">
                                    <Avatar src={this.state.item._source.picture} size={164}/>
                                </div>
                                <span className="details-username">{this.state.item._source.name.first + ' ' + this.state.item._source.name.last}</span>
                                <div className="details-informations">
                                    <Row justify="center">
                                        <Col span={24}>
                                            <Row>
                                                <Col span={12}><span><strong>ID</strong></span></Col>
                                                <Col span={12}><span style={{fontWeight: '700'}}>{this.state.item._source.id}</span></Col>
                                            </Row>
                                            <Divider />
                                            <Row>
                                                <Col span={12}><span><strong>Email</strong></span></Col>
                                                <Col span={12}><span>{this.state.item._source.email}</span></Col>
                                            </Row>
                                            <Divider />
                                            <Row>
                                                <Col span={12}><span><strong>Phone</strong></span></Col>
                                                <Col span={12}><span>{this.state.item._source.phone}</span></Col>
                                            </Row>
                                            <Divider />
                                            <Row>
                                                <Col span={12}><span><strong>Job title</strong></span></Col>
                                                <Col span={12}><span>{this.state.item._source.job_title}</span></Col>
                                            </Row>
                                            <Divider />
                                            <Row>
                                                <Col span={12}><span><strong>Age</strong></span></Col>
                                                <Col span={12}><span>{this.state.item._source.age}</span></Col>
                                            </Row>
                                            <Divider />
                                            <strong style={{ marginBottom: '.5rem' }}>About</strong>
                                            <Row>
                                                <Col span={24}><span>{this.state.item._source.about}</span></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        ) : (<div></div>)
                    }
                </Modal>
            </div>
        )
    }
    
}

export default EmployeesComponent;