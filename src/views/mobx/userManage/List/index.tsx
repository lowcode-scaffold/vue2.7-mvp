import { defineComponent } from "vue";
import {
  Table,
  Pagination,
  Row,
  Col,
  Button,
  Form,
  Input,
  Tag
} from "ant-design-vue";
import usePresenter from "./presenter";
import styles from "./index.module.scss";
import EditModal from "./EditModal";
import { observer } from "@/mobx-vue";
import { Column } from "ant-design-vue/types/table/column";
import { AntdComponent } from "ant-design-vue/types/component";
import { runInAction } from "mobx";

const Index = defineComponent({
  setup() {
    const presenter = usePresenter();
    const { model } = presenter;
    const culumns: Omit<Column, keyof AntdComponent>[] = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width: 150
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age",
        width: 150
      },
      {
        title: "电话",
        dataIndex: "mobile",
        key: "mobile",
        width: 150
      },
      {
        title: "tags",
        dataIndex: "tags",
        key: "tags",
        scopedSlots: { customRender: "tags" }
      },
      {
        title: "住址",
        dataIndex: "address",
        key: "address",
        width: 300
      },
      {
        title: "Action",
        key: "action",
        width: 200,
        scopedSlots: { customRender: "action" }
      }
    ];
    return { model, presenter, culumns };
  },
  render() {
    return (
      <div>
        <div class={styles.index}>
          <div class={styles.filter}>
            <Row gutter={[20, 0]}>
              <Col span={8}>
                <Form.Item label="名称">
                  <Input
                    value={this.model.filterForm.name}
                    placeholder="输入名称搜索"
                    onChange={(e: any) => {
                      this.presenter.handleFormChange("name", e.target.value);
                    }}
                    onPressEnter={this.presenter.handleSearch}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button type="primary" onClick={this.presenter.handleSearch}>
                  查询
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  onClick={this.presenter.handleReset}
                >
                  重置
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  type="primary"
                  onClick={() => {
                    runInAction(() => {
                      this.model.modalInfo.visible = true;
                      this.model.modalInfo.title = "创建";
                      this.model.modalInfo.data = undefined;
                    });
                  }}
                  icon="plus"
                >
                  创建
                </Button>
              </Col>
            </Row>
          </div>
          <Table
            columns={this.culumns}
            dataSource={this.model.userList}
            loading={this.model.loading}
            pagination={false}
            scopedSlots={{
              tags: (value: string[]) => {
                return value.map(s => {
                  return (
                    <Tag key={s} color="blue">
                      {s}
                    </Tag>
                  );
                });
              },
              action: (data: any) => {
                return (
                  <span>
                    <Button
                      type="link"
                      onClick={() => {
                        this.presenter.handelEdit(data);
                      }}
                    >
                      编辑
                    </Button>
                    <Button
                      type="link"
                      style={{ color: "red" }}
                      onClick={() => {
                        this.presenter.handleDel(data);
                      }}
                    >
                      删除
                    </Button>
                  </span>
                );
              }
            }}
            rowKey="id"
          ></Table>
          <Pagination
            current={this.model.pagination.page}
            total={this.model.pagination.total}
            showQuickJumper
            showSizeChanger
            hideOnSinglePage
            style={{ marginTop: "20px" }}
            pageSize={this.model.pagination.size}
            onChange={(page: number, pageSize: number) => {
              this.presenter.handlePageChange(page, pageSize);
            }}
            onShowSizeChange={(page: number, pageSize: number) => {
              this.presenter.handlePageChange(page, pageSize);
            }}
          />
        </div>

        <EditModal
          visible={this.model.modalInfo.visible}
          data={this.model.modalInfo.data}
          title={this.model.modalInfo.title}
          onCancel={() => {
            runInAction(() => {
              this.model.modalInfo.visible = false;
            });
          }}
          onOk={() => {
            runInAction(() => {
              this.model.modalInfo.visible = false;
            });
            this.presenter.refresh();
          }}
        />
      </div>
    );
  }
});
export default observer(Index);
