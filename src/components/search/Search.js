import React, { Component } from 'react';
import { Input, Row, Col, Divider, Select, Button, Modal, Spin, InputNumber } from 'antd';
import './Search.css';
import CompagniesComponent from '../compagnies/Compagnies';
import EmployeesComponent from '../employees/Employees';
import axios from 'axios';

const Search = Input.Search;
const { Option } = Select;

class SearchComponent extends Component {

    state = {
        dataSource: [],
        total: 0,
        visible: false,
        search: false,
        confirmLoading: false,
        dataLoading: false,
        industries: [],
        category: '',
        body: '',
        emFilters: [],
        coFilters: []
    }

    componentDidMount() {
        this.setState({
            category: 'employees'
        })
        const body = {
            "aggs": {
                "industries": {
                    "terms": { "field": "industry.keyword" }
                }
            },
            "size": 0
        }

        const config = {
            "params": {
                index: 'companies'
            }
        }
        axios.post('http://104.248.135.84:3001/search', body, config)
        .then(res => {
            this.setState({
                industries: res.data.aggregations.industries.buckets
            })
        })
        .catch(err => {
            console.log(err);
            this.setState({
                dataLoading: false
            })
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({
            visible: false,
            confirmLoading: false
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    handleCategoryChange = (value) => {
        this.setState({
            category: value
        })
    }

    handleSearch = (value) => {
        
    }

    handleQuery = (event) => {
        const value = event.target.value;
        if (value) {
            let query = '';
            const toParse = value.toLowerCase().trim();
            if (toParse.includes(' ')) {
                const arr = toParse.split(' ');
                arr.forEach(a => {
                    query += a + '* and ' 
                })
                query = query.substring(0, query.length - 5);
            } else {
                query = toParse + '*';
            }

            const body = {
                "query": {
                    "bool": {
                        "must": {
                            "query_string" : {
                                "fields" : (this.state.category === 'employees') ? ["job_title", "name.*^5", "email^2", "phone"] : ["company^5", "email^3", "industry^2", "phone"],
                                "query" : query
                            }
                        }
                    }
                },
                "size": 5000
            }

            const config = {
                "params": {
                    index: this.state.category
                }
            }
            this.setState({
                dataLoading: true,
                search: true
            })
            axios.post('http://104.248.135.84:3001/search', body, config)
            .then(res => {
                this.setState({
                    dataSource: res.data.hits.hits,
                    total: res.data.hits.total,
                    dataLoading: false,
                    body: body
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    dataLoading: false
                })
            })
        } else {
            this.setState({
                search: false
            })
        }
    }

    handleAgeChange = (value) => {
        if (value && value > 0) {
            let emFilters = [...this.state.emFilters];
            if (this.findPosition(emFilters, 'age') === 40 || emFilters.length === 0) {
                emFilters.push({
                    "term": {
                        "age": value
                    }
                })
            } else {
                emFilters.splice(this.findPosition(emFilters, 'age'), 1)
                emFilters.push({
                    "term": {
                        "age": value
                    }
                })
            }
            this.setState({
                emFilters: emFilters
            })
        }
    }

    handleChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        if (value) {
            let emFilters = [...this.state.emFilters];
            let coFilters = [...this.state.coFilters];
            const query = value.toLowerCase().trim();
            switch (id) {
                case 'em-firstname':
                    if (this.findPosition(emFilters, 'name.first') === 40) {
                        emFilters.push({
                            "term": {
                                "name.first": query
                            }
                        })
                    } else {
                        emFilters.splice(this.findPosition(emFilters, 'name.first'), 1)
                        emFilters.push({
                            "term": {
                                "name.first": query
                            }
                        })
                    }
                    break;
                case 'em-lastname':
                    if (this.findPosition(emFilters, 'name.last') === 40) {
                        emFilters.push({
                            "term": {
                                "name.last": query
                            }
                        })
                    } else {
                        emFilters.splice(this.findPosition(emFilters, 'name.last'), 1)
                        emFilters.push({
                            "term": {
                                "name.last": query
                            }
                        })
                    }
                    break; 
                case 'em-email':
                    if (this.findPosition(emFilters, 'email') === 40) {
                        emFilters.push({
                            "term": {
                                "email": query
                            }
                        })
                    } else {
                        emFilters.splice(this.findPosition(emFilters, 'email'), 1)
                        emFilters.push({
                            "term": {
                                "email": query
                            }
                        })
                    }
                    break;  
                case 'em-jobtitle':
                    if (this.findPosition(emFilters, 'job_title') === 40) {
                        emFilters.push({
                            "term": {
                                "job_title": query
                            }
                        })
                    } else {
                        emFilters.splice(this.findPosition(emFilters, 'job_title'), 1)
                        emFilters.push({
                            "term": {
                                "job_title": query
                            }
                        })
                    }
                    break;
                case 'co-company':
                    if (this.findPosition(coFilters, 'company') === 40) {
                        coFilters.push({
                            "term": {
                                "company": query
                            }
                        })
                    } else {
                        coFilters.splice(this.findPosition(coFilters, 'company'), 1)
                        coFilters.push({
                            "term": {
                                "company": query
                            }
                        })
                    }
                    break;
                case 'co-email':
                    if (this.findPosition(coFilters, 'email') === 40) {
                        coFilters.push({
                            "term": {
                                "email": query
                            }
                        })
                    } else {
                        coFilters.splice(this.findPosition(coFilters, 'email'), 1)
                        coFilters.push({
                            "term": {
                                "email": query
                            }
                        })
                    }
                    break;
                default:
                    break;
            }
            this.setState({
                emFilters: emFilters,
                coFilters: coFilters
            })
        }
    }

    findPosition(arr, index) {
        let position = 10;
        for (let i=0; i<arr.length; i++) {
            let term = arr[i];
            if (term.term[index]) {
                position = i;
            }
        }
        
        return position;
    }

    handleIndustryChange = (value) => {
        if (value) {
            let coFilters = [...this.state.coFilters];
            if (this.findPosition(coFilters, 'industry.keyword') === 40 || coFilters.length === 0) {
                coFilters.push({
                    "term": {
                        "industry.keyword": value
                    }
                })
            } else {
                coFilters.splice(this.findPosition(coFilters, 'industry.keyword'), 1)
                coFilters.push({
                    "term": {
                        "industry.keyword": value
                    }
                })
            }
            this.setState({
                coFilters: coFilters
            })
        }
    }

    handleApply = () => {
        let { body, category, emFilters, coFilters } = this.state;
        if (body) {
            if (category === 'employees') {
                body.query.bool['filter'] = emFilters
            } else {
                body.query.bool['filter'] = coFilters
            }
            if (!body.query.bool.must.query_string) {
                body.query.bool.must['match_all'] = {}
            }
        } else {
            body = {
                "query": {
                    "bool": {
                        "must": {
                            "match_all" : {}
                        }
                    }
                },
                "size": 5000
            }
            if (category === 'employees') {
                body.query.bool['filter'] = emFilters
            } else {
                body.query.bool['filter'] = coFilters
            }
        }
        this.setState({
            body: body
        })

        this.processFiltering(body)
    }

    processFiltering(body) {
        const config = {
            "params": {
                index: this.state.category
            }
        }
        this.setState({
            dataLoading: true,
            search: true
        })
        axios.post('http://104.248.135.84:3001/search', body, config)
        .then(res => {
            this.setState({
                dataSource: res.data.hits.hits,
                total: res.data.hits.total,
                dataLoading: false,
                body: body
            })
            console.log(res);
        })
        .catch(err => {
            console.log(err);
            this.setState({
                dataLoading: false
            })
        })
    }

    handleReset = () => {
        this.setState({
            emFilters: [],
            coFilters: []
        })
        let { body } = this.state;
        if (body) {
            if (body.query.bool.filter) {
                body.query.bool.filter = [];
                this.processFiltering(body);
            }
        }
    }

    render() {
        const { visible, confirmLoading, category, dataSource, total, search, industries } = this.state;

        return (
            <div>
                <Row type="flex" justify="center">
                    <Col span={12}>
                        <Search
                            placeholder="Search"
                            onSearch={this.handleSearch}
                            onKeyUp={this.handleQuery}
                            style={{ width: '100%' }} 
                        />
                    </Col>
                </Row>
                <div className="results">
                    <Divider />
                    <Row type="flex" justify="center">
                        <Col span={4} style={{ marginRight: '1rem' }}>
                            <Select
                                value={category}
                                style={{ width: '100%' }}
                                onChange={this.handleCategoryChange}
                                >
                                <Option value="employees">Employees</Option>
                                <Option value="companies">Companies</Option>
                            </Select>
                        </Col>
                        <Col span={6} style={{ marginLeft: '1rem' }}>
                            <Row type="flex" justify="space-between">
                                <Col span={8}>
                                    <Button type="primary" icon="check" onClick={this.handleApply}>Apply</Button>
                                </Col>
                                <Col span={8}>
                                    <Button type="danger" icon="delete" onClick={this.handleReset}>Reset</Button>
                                </Col>
                                <Col span={8}>
                                    <Button type="default" icon="align-center" onClick={this.showModal}>All filters</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Divider />
                </div>
                <Modal
                    title={
                        (category && category === 'employees') ? (
                            <strong>All employees filters</strong>
                        ) : (
                            <strong>All companies filters</strong>
                        )
                    }
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    width={420}
                    footer={null}
                    >
                    {
                        (category && category === 'employees') ? (
                            <div className="employees-filter">
                                <div className="filter-group">
                                    <label>First name</label>
                                    <Input onChange={this.handleChange} id="em-firstname"/>
                                </div>
                                <div className="filter-group">
                                    <label>Last name</label>
                                    <Input onChange={this.handleChange} id="em-lastname"/>
                                </div>
                                <div className="filter-group">
                                    <label>Email</label>
                                    <Input onChange={this.handleChange} id="em-email"/>
                                </div>
                                <div className="filter-group">
                                    <label>Job title</label>
                                    <Input onChange={this.handleChange} id="em-jobtitle"/>
                                </div>
                                <div className="filter-group">
                                    <label>Age</label>
                                    <InputNumber type="number" ref={input => {this.emAge = input;}} style={{ display: 'block', width: '100%' }} onChange={this.handleAgeChange} id="em-age"/>
                                </div>
                            </div>
                        ) : (
                            <div className="companies-filter">
                                <div className="filter-group">
                                    <label>Company</label>
                                    <Input onChange={this.handleChange} id="co-company"/>
                                </div>
                                <div className="filter-group">
                                    <label>Industry</label>
                                    <Select
                                        style={{ width: '100%' }}
                                        onChange={this.handleIndustryChange}
                                        >
                                        {
                                            (industries) ? (
                                                industries.map(industry => {
                                                    return (
                                                        <Option value={industry.key} key={industry.key}>{industry.key}</Option>
                                                    )
                                                })
                                            ) : (
                                                <Option value="None">None</Option>
                                            )
                                        }
                                    </Select>
                                </div>
                                <div className="filter-group">
                                    <label>Email</label>
                                    <Input onChange={this.handleChange} id="co-email"/>
                                </div>
                            </div>
                        )
                    }
                </Modal>
                {
                    (search) ? (
                        (this.state.dataLoading) ? (
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem'}}>
                                <Spin size="large" />
                            </div>
                        ) : (
                            <div>
                                <p>Total found : <strong>{total}</strong></p>
                                {
                                    (category && category === 'employees') ? (
                                        <EmployeesComponent dataSource={dataSource} />
                                    ) : (
                                        <CompagniesComponent dataSource={dataSource}/>
                                    )
                                }
                            </div>
                            
                        )
                    ) : (
                        <div></div>
                    )
                }
            </div>
        )
    }
}

export default SearchComponent;